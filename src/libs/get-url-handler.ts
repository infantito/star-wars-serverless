const getUrlHandler = (handler: string): string => {
  const workspace = process.cwd()

  const pathname = `${workspace}/src/functions/${handler}.main`
}
