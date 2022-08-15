require "json"
require File.join(__dir__, 'lib', 'content_url')

module Jekyll
    class MDImageLinksTag < Liquid::Tag
  
      def initialize(tag_name, arguments, tokens)
        super(tag_name, arguments, tokens)
        begin
          @arguments = JSON.parse(arguments.strip) 
        rescue
          @arguments = {}
        end
        @token = tokens
      end

       # Lookup allows access to the page/post variables through the tag context
      def lookup(context, name)
        lookup = context
        name.split(".").each { |value| lookup = lookup[value] }
        lookup
      end
  
      def render(context)
        #Jekyll.logger.debug "context", context.registers[:page].images
        Jekyll.logger.debug "arguments", @arguments
        #puts "arguments", @arguments
        format = @arguments['format'] || "250x250"
        prefix = @arguments['prefix'] || "image-"
        page = context.registers[:page]
        images = page["images"]
        output = images.map.with_index{ |img, idx| "[#{get_ref(img, prefix, idx)}]: #{get_url_for(img['file'], format, page)} \"#{img['title']}\" " }
        #puts output.join("  \n")
        return output.join("  \n")
      end

      def get_ref(image, prefix, idx)
        image["ref"] || "#{prefix}#{idx}"
      end

    end
  end
  
  Liquid::Template.register_tag('md_image_links', Jekyll::MDImageLinksTag)