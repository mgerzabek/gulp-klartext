const { Transform } = require('stream')
const PluginError = require('plugin-error')
const MarkdownIt = require('markdown-it')
const plainText = require('markdown-it-plain-text')

const PLUGIN_NAME = 'gulp-klartext'

module.exports = (options = {}) =>
{

  return new Transform({
    objectMode: true,
    transform(file, enc, callback)
    {
      const markdown = new MarkdownIt(options)
      markdown.use(plainText)

      if (file.isNull())
      {
        return callback(null, file)
      }

      if (file.isStream())
      {
        return callback(new PluginError(PLUGIN_NAME, 'Streaming is not supported'))
      }

      if (file.isBuffer())
      {
        markdown.render( file.contents.toString() )
        file.contents = Buffer.from(markdown.plainText)
        return callback(null, file)
      }

      return null
    }
  })
}
