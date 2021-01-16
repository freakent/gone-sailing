module Jekyll
    module ContentURLFilter
      def content_url(input, format)
        base_url = @context.registers[:page]['content_baseurl'] || @context.registers[:site].config['cdnurl']
        source = @context.registers[:page]['path'] 
        dir = source.delete_suffix(File.extname(source)).delete_prefix("_")
        "#{base_url}/#{dir}/#{format}/#{input}?#{Time.now.to_i}"
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::ContentURLFilter)