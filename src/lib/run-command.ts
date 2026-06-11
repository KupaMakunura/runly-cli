export async function runCommand(
  command: string[],
  options: { cwd?: string; quiet?: boolean } = {},
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(command, {
    cwd: options.cwd,
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  });

  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);

  if (!options.quiet && exitCode !== 0) {
    throw new Error(
      `Command failed (${exitCode}): ${command.join(" ")}\n${stderr || stdout}`,
    );
  }

  return { stdout, stderr, exitCode };
}
