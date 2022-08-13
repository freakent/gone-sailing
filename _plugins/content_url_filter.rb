require File.join(__dir__, 'lib', 'content_url')

module Jekyll
    module ContentURLFilter
      def content_url(input, format, page=@context.registers[:page])
        get_url_for(input, format, page)
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::ContentURLFilter)