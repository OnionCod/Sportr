// shortcut for starting the web UI from npm runnable and installable commands
export default async function duckui(app) {
    await app.models.database.connection((c) => c.run('CALL start_ui();'));
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}
duckui.description = 'Start duckDB UI';
duckui.usage = `Usage: APPLICATION duckui

  node index.js duckui

Options:
  -h, --help   Show this summary of available options
`;
//# sourceMappingURL=duckui.js.map