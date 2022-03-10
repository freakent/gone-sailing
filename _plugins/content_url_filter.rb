module Jekyll
    module ContentURLFilter
      def content_url(input, format, page=@context.registers[:page])
        base_url = page['content_baseurl'] || @context.registers[:site].config['cdnurl'] # 
        source = page['content_path'] || page['path'] #
        dir = source.delete_suffix(File.extname(source)).delete_prefix("_") if page['collection']
        collection = 'site' unless page['collection']
        [base_url, collection, dir, format, "#{input}?#{Time.now.to_i}"].compact.join("/")
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::ContentURLFilter)