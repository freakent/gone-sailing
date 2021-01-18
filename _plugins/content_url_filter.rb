module Jekyll
    module ContentURLFilter
      def content_url(input, format, page=@context.registers[:page])
        base_url = page['content_baseurl'] || @context.registers[:site].config['cdnurl']
        source = page['content_path'] || page['path'] 
        dir = source.delete_suffix(File.extname(source)).delete_prefix("_")
        "#{base_url}/#{dir}/#{format}/#{input}?#{Time.now.to_i}"
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::ContentURLFilter)