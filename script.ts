import execa from 'execa'

await execa('pnpm', ['i', '-g', 'vsce'], { stdio: 'inherit' })
await execa('vsce', ['-v'], { stdio: 'inherit' })
