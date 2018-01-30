var extractTags = function(link, html, tag, startTag){
    var allTags = [];
   
    function extract(html, tag, startTag,endTag){
        if(html.search(startTag) != -1){
            if(!startTag){
               var {startTag, endTag} = makeTags(tag);
            }
            var positionStart = html.search(startTag); 
            var positionEnd = html.search(endTag) + endTag.length;
            var cutTag = html.slice(positionStart,positionEnd);
            
            if(cutTag) allTags.push(cutTag);

            extract(html.substring(positionEnd), tag, startTag, endTag);
        }
    }

    function makeTags(tag){
        var startTag, endTag;
            switch(tag){
                case 'a':
                    startTag = startTag || '<' + tag + ' ';
                    break;
                case 'img':
                    endTag = '>';
                    startTag = startTag || '<' + tag;
                    break;
                default:
                    startTag = startTag || '<' + tag;
            }
        endTag =  endTag || '</' + tag + '>';
        return {startTag: startTag,endTag: endTag};
    }
    
    function verifyImages(link){
        allTags = allTags.map(function(img){
            if(img.search('http')=== -1){
                var positionStart = img.search('src="') + 'src="'.length;
                img = img.substring(0, positionStart) + link + '/' + img.substring(positionStart);
            }
            return img;
        });
    }

    extract(html, tag, startTag)

    if(tag === 'img'){
        verifyImages(link);
    }

    return allTags.join('');
}
module.exports = extractTags;