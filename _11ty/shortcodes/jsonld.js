const wrapper = function(content, type) {

    let ret = `
    <script type="application/ld+json">
    {
        "@context": "http://schema.org",
        "@type": "${type}"`;
        if (content.trim().length > 0) {
            ret += `,${removeTrailingComma(content)}`
        }
    ret += `\n\t}\n\t</script>`;
    return ret;
}

const propertyWrapper = function(content, property, type) {

    let ret =`"${property}": { "@type": "${type}" `;
    if (content.trim().length > 0) {
        ret += `,${removeTrailingComma(content)}`
    }
    ret += `},`;
    return ret;
}

const description = function(description) {
    return kvp("description", description);
}

const sameAs = function(...args) {
    return `"sameAs": ` + jsonSingleOrArray(...args);
}

const author = function(content,name) {

    let ret = `"author": { "@type": "Person", "name": "${name}"`;
    if (!isEmpty(content)) {
        ret += `, ${removeTrailingComma(content)}`;
    }
    ret += ` },`;
    return ret;
}

const mainEntity = function (url) {
    return `"mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" },`
}

const headline = function(headline) {
    return kvp("headline", headline);
}

const article = function(content, headlineText) {
    let newContent = `\n\t\t` + headline(headlineText) + content;
    return wrapper(newContent, "Article");
}

const blogposting = function(content, headlineText) {

    let newContent = `\n\t\t` + headline(headlineText) + content;
    return wrapper(newContent, "BlogPosting");
}

const image = function(...args) {
    return `"image": ` + jsonSingleOrArray(...args);
}

const url = function(url) {
    return kvp("url", url);
}

const id = function(id) {
    return kvp("@id", id);
}

const type = function(type) {
    return kvp("@type", type);
}

const kvp = function(key, value) {
    return `"${key}": "${value}",`;
}


const jsonSingleOrArray = function(...args) {
    if (args.length === 1) {
        return `"${args[0]}"`;
    } else {
        return `["` + args.join(`","`) + `"],`;
    }
}


const isEmpty = function(content) {
    return content.trim().length === 0;
}

const removeTrailingComma = function(content) {
    //this is super hacky but I can't think of a better way
    //remove the trailing comma from the individual components that may have been inserted
    content = content.trimRight();
    if (content.charAt(content.length -1 ) == ',') {
        content = content.slice(0, -1);
    }
    return content;
}


module.exports = {
    wrapper,
    description,
    sameAs,
    author,
    mainEntity,
    headline,
    article,
    blogposting,
    image,
    url,
    id,
    type,
    propertyWrapper,
    kvp
}
