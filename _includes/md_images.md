{% for img in page.images %}
[image-{{ forloop.index }}]: {{ img.file | content_url:"250x250" }} "{{ img.title }}"
{% endfor %}