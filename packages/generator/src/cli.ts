#!/usr/bin/env node

import { program } from 'commander'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import ora from 'ora'
import pc from 'picocolors'
import { loadConfig, getDefaultConfigContent } from './config'
import { generateAvatars } from './generate'

program
  .name('skyface')
  .description('Generate weather avatar variants using AI')
  .version('0.0.1')

program
  .command('init')
  .description('Create a skyface.config.json file')
  .option('-f, --force', 'Overwrite existing config')
  .action((options) => {
    const configPath = resolve(process.cwd(), 'skyface.config.json')

    if (existsSync(configPath) && !options.force) {
      console.log(pc.yellow('Config file already exists. Use --force to overwrite.'))
      process.exit(1)
    }

    writeFileSync(configPath, getDefaultConfigContent())
    console.log(pc.green('Created skyface.config.json'))
    console.log('')
    console.log('Next steps:')
    console.log('  1. Add your avatar image (e.g., avatar.png)')
    console.log('  2. Set GEMINI_API_KEY environment variable')
    console.log('  3. Customize prompts in skyface.config.json')
    console.log('  4. Run: npx skyface generate')
  })

program
  .command('generate')
  .description('Generate avatar variants for all weather conditions')
  .option('-d, --dry-run', 'Preview prompts without generating')
  .action(async (options) => {
    const spinner = ora('Loading config...').start()

    try {
      const config = loadConfig()

      if (!config.apiKey) {
        spinner.fail('GEMINI_API_KEY not set')
        console.log('')
        console.log('Set it in your environment:')
        console.log('  export GEMINI_API_KEY=your-key')
        process.exit(1)
      }

      if (!existsSync(config.input)) {
        spinner.fail(`Input image not found: ${config.input}`)
        process.exit(1)
      }

      // Create output directory
      if (!existsSync(config.output)) {
        mkdirSync(config.output, { recursive: true })
      }

      if (options.dryRun) {
        spinner.info('Dry run - showing prompts only')
        // TODO: Show all prompts
        return
      }

      spinner.text = 'Generating avatars...'

      await generateAvatars({
        config,
        onProgress: (condition, variant, total) => {
          spinner.text = `Generating ${condition} (${variant}/${config.variants})...`
        },
      })

      spinner.succeed(`Generated ${config.variants * 9} avatar variants`)
      console.log(`Output: ${config.output}`)
    } catch (error) {
      spinner.fail((error as Error).message)
      process.exit(1)
    }
  })

program.parse()
