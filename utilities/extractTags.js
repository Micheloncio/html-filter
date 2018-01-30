var extractTags = function(html, tag, startTag){
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
    
    extract(html, tag, startTag)
    return allTags;
}
module.exports = extractTags;