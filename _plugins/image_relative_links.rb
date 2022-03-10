module Jekyll
    class ImageRelativeLinksTag < Liquid::Tag
  
      def initialize(tag_name, arguments, tokens)
        super(tag_name, arguments, tokens)
        @arguments = arguments
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
        images = context.registers[:page]["images"]
        output = images.map.with_index{ |img, idx| "[image-#{idx}]:#{img["file"]} \"#{img["title"]}\" " }
        puts output.join("  /n")
        output.join("  /n")
      end
    end
  end
  
  Liquid::Template.register_tag('image_relative_links', Jekyll::ImageRelativeLinksTag)