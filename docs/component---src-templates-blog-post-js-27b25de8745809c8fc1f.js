(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{150:function(e,t,n){"use strict";n.r(t);var o=n(6),r=n.n(o),i=n(0),a=n.n(i),s=n(4),l=n.n(s),c=n(169),u=n.n(c),d=n(154),f=(n(70),n(357)),p=n.n(f),h=d.d.a.withConfig({displayName:"EditBtn__A",componentId:"v55wgo-0"})(["display:block;text-align:center;padding:1rem;color:",";cursor:pointer;font-size:1rem;transition:0.3s;&:hover{transition:0.3s;color:",";}"],function(e){return e.theme.colors.yellow},function(e){return e.theme.colors.white}),g=Object(d.d)(p.a).withConfig({displayName:"EditBtn__EditIcon",componentId:"v55wgo-1"})(["padding:0 "," 0 0;"],function(e){return e.theme.scale(-8)}),m=function(e){return"https://github.com/hugomn/hugomn/blob/master/src/"+e.split("/src/")[1]},b=function(e){var t=e.fileAbsolutePath,n=e.currentLangKey;return a.a.createElement(h,{href:m(t),target:"_blank"},a.a.createElement(g,null),{en:"Edit",fr:"Modifier",pt:"Editar"}[n])};b.propTypes={fileAbsolutePath:l.a.string,currentLangKey:l.a.string};n(225);var y=n(165),w=n(155),v=d.d.section.withConfig({displayName:"Tags__Section",componentId:"ba2vl1-0"})(["text-align:center;margin:1rem;padding:0;"]),S=d.d.header.withConfig({displayName:"Tags__Header",componentId:"ba2vl1-1"})(["padding:"," 0;display:block;"],function(e){return e.theme.scale(-3)}),E=d.d.li.withConfig({displayName:"Tags__Li",componentId:"ba2vl1-2"})(["display:inline;&:not(:last-child):after{content:',';margin:0 1rem 0 0;display:inline-block;}"]),O=Object(d.d)(y.Link).withConfig({displayName:"Tags__A",componentId:"ba2vl1-3"})(["font-weight:bold;color:",";display:inline-block;position:relative;text-decoration:underline;transition:0.3s;padding:"," 0 "," 0;&:hover{color:",";transition:0.3s;}"],function(e){return e.theme.colors.yellow},function(e){return e.theme.scale(-2)},function(e){return e.theme.scale(-2)},function(e){return e.theme.colors.white}),j=function(e){var t=e.tag;return a.a.createElement(E,null,a.a.createElement(O,{to:t.link},t.tag))};j.propTypes={tag:l.a.object};var _=d.d.ul.withConfig({displayName:"Tags__Ul",componentId:"ba2vl1-4"})(["list-style:none;margin:0;padding:0;display:block;"]),z=function(e){return e.tags&&0!==e.tags.length?a.a.createElement(v,null,a.a.createElement(S,null,a.a.createElement(w.b,{id:"tags"})),a.a.createElement(_,null,(e.tags||[]).map(function(e,t){return a.a.createElement(j,{tag:e,key:t})}))):null};z.propTypes={tags:l.a.array};var k=z,N=n(177),L=n(171),C=(n(27),n(589)),q=n.n(C),I=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return a.a.createElement(q.a,Object.assign({onNewComment:this.handleNewComment},this.props))},t}(a.a.PureComponent);I.propTypes={shortname:l.a.string,identifier:l.a.string,title:l.a.string,url:l.a.string,category_id:l.a.string};var T=Object(d.d)(I).withConfig({displayName:"Comments",componentId:"sc-1bd7u1q-0"})(["margin:"," 0;"],function(e){return e.theme.scale(6)}),R=n(168),x=n(183),P=n.n(x);n.d(t,"pageQuery",function(){return W});Object(d.d)(L.a).withConfig({displayName:"blog-post__Time",componentId:"lodmgn-0"})(["text-align:center;font-size:",";font-weight:bold;color:",";width:100%;display:block;padding-top:1rem;"],function(e){return e.theme.blog.post.header.time.fontSize},function(e){return e.theme.blog.post.header.time.color});var D=d.d.article.withConfig({displayName:"blog-post__Post",componentId:"lodmgn-1"})(["margin:",";padding:",";max-width:",";"],function(e){return e.theme.blog.post.margin},function(e){return e.theme.blog.post.padding},function(e){return e.theme.blog.post.maxWidth}),B=d.d.h1.withConfig({displayName:"blog-post__H1",componentId:"lodmgn-2"})(["padding-bottom:0;font-family:",";margin:",";font-size:",";"],function(e){return e.theme.blog.post.header.fontFamily},function(e){return e.theme.blog.post.header.margin},function(e){return e.theme.blog.post.header.fontSize}),M=d.d.section.withConfig({displayName:"blog-post__Content",componentId:"lodmgn-3"})(["margin:0 0 "," 0;font-family:",";p > code{color:",";font-size:",";margin:",";padding:",";background-color:",";border-radius:",";}.gatsby-highlight{margin:",";padding:",";background-color:",";display:flex;border-radius:",";overflow:auto;code{color:",";}pre{width:100%;border:2px solid ",";}}a{color:",";}h1{margin:",";padding:",";font-size:",";}h2{margin:",";padding:",";font-size:",";}h3{margin:",";padding:",";font-size:",";}h4{margin:",";padding:",";font-size:",";}h5{margin:",";padding:",";font-size:",";}h6{margin:",";padding:",";font-size:",";}p{margin:",";padding:",";font-size:",";line-height:",";}strong{font-weight:bold;}ul,ol{margin:",";padding:",";font-size:",";}ul{list-style:disc;}ol{list-style:decimal;}li{padding-top:1rem;}blockquote{font-style:italic;margin:0;padding:",";position:relative;text-align:center;color:",';}blockquote:before{line-height:1.45;display:block;content:"\\201C";position:absolute;top:-',";left:-",";font-size:",";color:",';}blockquote:after{display:block;content:"\\201D";position:absolute;bottom:-',";right:",";font-size:",";color:",";}blockquote cite{color:",";font-size:",';display:block;}blockquote cite:before{content:"\\2014 \\2009";}img{max-width:100%;}'],function(e){return e.theme.scale(6)},function(e){return e.theme.blog.post.content.fontFamily},function(e){return e.theme.blog.post.content.code.color},function(e){return e.theme.blog.post.content.code.fontSize},function(e){return e.theme.blog.post.content.code.margin},function(e){return e.theme.blog.post.content.code.padding},function(e){return e.theme.blog.post.content.code.backgroundColor},function(e){return e.theme.blog.post.content.code.borderRadius},function(e){return e.theme.blog.post.content.highlight.margin},function(e){return e.theme.blog.post.content.highlight.padding},function(e){return e.theme.blog.post.content.highlight.backgroundColor},function(e){return e.theme.blog.post.content.highlight.borderRadius},function(e){return e.theme.blog.post.content.highlight.code.color},function(e){return e.theme.colors.white},function(e){return e.theme.blog.post.content.a.color},function(e){return e.theme.blog.post.content.h1.margin},function(e){return e.theme.blog.post.content.h1.padding},function(e){return e.theme.blog.post.content.h1.fontSize},function(e){return e.theme.blog.post.content.h2.margin},function(e){return e.theme.blog.post.content.h2.padding},function(e){return e.theme.blog.post.content.h2.fontSize},function(e){return e.theme.blog.post.content.h3.margin},function(e){return e.theme.blog.post.content.h3.padding},function(e){return e.theme.blog.post.content.h3.fontSize},function(e){return e.theme.blog.post.content.h4.margin},function(e){return e.theme.blog.post.content.h4.padding},function(e){return e.theme.blog.post.content.h4.fontSize},function(e){return e.theme.blog.post.content.h5.margin},function(e){return e.theme.blog.post.content.h5.padding},function(e){return e.theme.blog.post.content.h5.fontSize},function(e){return e.theme.blog.post.content.h6.margin},function(e){return e.theme.blog.post.content.h6.padding},function(e){return e.theme.blog.post.content.h6.fontSize},function(e){return e.theme.blog.post.content.p.margin},function(e){return e.theme.blog.post.content.p.padding},function(e){return e.theme.p.fontSize},function(e){return e.theme.p.lineHeight},function(e){return e.theme.blog.post.content.ul.margin},function(e){return e.theme.blog.post.content.ul.padding},function(e){return e.theme.blog.post.content.ul.fontSize},function(e){return e.theme.scale(3)},function(e){return e.theme.colors.white},function(e){return e.theme.scale(-4)},function(e){return e.theme.scale(1)},function(e){return e.theme.scale(10)},function(e){return e.theme.colors.white},function(e){return e.theme.scale(6)},function(e){return e.theme.scale(1)},function(e){return e.theme.scale(10)},function(e){return e.theme.colors.white},function(e){return e.theme.colors.blue},function(e){return e.theme.scale(-1)}),V=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.data.markdownRemark,t=(this.props.pageContext.langKey,Object(N.a)(e)),n="https://hugomagalhaes.com"+e.fields.slug;a.a.createElement(k,{tags:e.fields.tagSlugs});return a.a.createElement(R.a,{location:this.props.location},a.a.createElement(D,null,a.a.createElement(u.a,{title:""+e.frontmatter.title,meta:[{name:"description",content:e.excerpt}]}),a.a.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:t}}),a.a.createElement("header",null,a.a.createElement(B,null,e.frontmatter.title),a.a.createElement(P.a,{sizes:e.frontmatter.image.childImageSharp.sizes})),a.a.createElement(M,{dangerouslySetInnerHTML:{__html:e.html}}),a.a.createElement(T,{shortname:"hugomagalhes",identifier:e.fields.slug,title:e.frontmatter.title,url:n})))},t}(a.a.PureComponent);V.propTypes={data:l.a.object,location:l.a.object.isRequired,pageContext:l.a.object};t.default=V;var W="606726238"},163:function(e,t,n){n(27);var o={hugomn:{name:"Hugo Nogueira",additionalName:"hugomn",address:"Berlin CA",birthDate:"1986-09-01",birthPlace:"Juiz de Fora BR",brand:"Hugo Nogueira, Software Engineer, Lead Front-end engineer, Senior ReactJs developer",children:"...",email:"hugomn@gmail.com",familyName:"Nogueira",gender:"Male",givenName:"Hugo",height:"...",homeLocation:"Berlin",jobTitle:"Software Engineering Lead",knows:"...",memberOf:"...",nationality:"Brazilian",owns:"...",parent:"...",performerIn:"...",publishingPrinciples:"...",relatedTo:"...",seeks:"...",sibling:"...",spouse:{additionalName:"Lunara Leto Costa",name:"Lunara Leto Costa",givenName:"Lunara",familyName:"Costa",gender:"Female",nationality:"Brazilian",homeLocation:"Berlin"},telephone:"...",weight:"...",workLocation:"...",worksFor:"...",description:"...",disambiguatingDescription:"...",identifier:"...",image:"http://www.gravatar.com/avatar/9174fca44b5ca403593ac9cb2407e0e7",sameAs:"https://hugomagalhaes.com/en/about/",url:"https://hugomagalhaes.com/en/about/"}};e.exports={authors:o,getAuthor:function(e){var t=Object.assign({},o[e],{"@type":"Person"});return t||o[0]}}},171:function(e,t,n){"use strict";n(27);var o=n(0),r=n.n(o),i=n(4),a=n.n(i),s=n(155),l=function(e){return r.a.createElement("time",Object.assign({},e,{dateTime:e.date}),r.a.createElement(s.a,{value:new Date(e.date),month:"long",day:"numeric",year:"numeric"}))};l.propTypes={date:a.a.string.isRequired},t.a=l},177:function(e,t,n){"use strict";n.d(t,"a",function(){return h}),n.d(t,"b",function(){return g});n(27);var o=n(158),r=n(199),i=n(163),a=Object(o.curry)(function(e,t){return Object(r.isNilOrEmpty)(t)?t:Object(o.keys)(t).reduce(function(n,o){var r=t[o];return"object"==typeof r?n[o]=a(e,t[o]):e(r)&&(n[o]=t[o]),n},{})}),s=a(function(e){return Object(r.isNotNilOrEmpty)(e)&&"..."!==e}),l=function(e){return Object(o.keys)(e).reduce(function(t,n){return t["type"===n?"@type":n]=e[n],t},{})},c=function(e){return e["@context"]="http://schema.org/",e},u=Object(o.pipe)(Object(o.prop)("frontmatter"),Object(o.prop)("date")),d=Object(o.pipe)(Object(o.prop)("frontmatter"),Object(o.prop)("title")),f=Object(o.pipe)(Object(o.prop)("html")),p=Object(o.pipe)(Object(o.prop)("frontmatter"),Object(o.prop)("title")),h=Object(o.pipe)(function(e){return Object(o.assocPath)(["frontmatter","structuredData","datePublished"],u(e),e)},function(e){return Object(o.assocPath)(["frontmatter","structuredData","headline"],d(e),e)},function(e){return Object(o.assocPath)(["frontmatter","structuredData","articleBody"],f(e),e)},function(e){return Object(o.assocPath)(["fields","langKey"],p(e),e)},Object(o.prop)("frontmatter"),Object(o.prop)("structuredData"),l,c,function(e){return e.author?Object.assign({},e,{author:Object(i.getAuthor)(e.author)}):e},s,JSON.stringify),g=Object(o.pipe)(l,c,s,JSON.stringify)},183:function(e,t,n){"use strict";var o=n(28);t.__esModule=!0,t.default=void 0;var r,i=o(n(6)),a=o(n(46)),s=o(n(205)),l=o(n(226)),c=o(n(0)),u=o(n(4)),d=function(e){var t=(0,l.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},f={},p=function(e){var t=d(e),n=t.fluid?t.fluid.src:t.fixed.src;return f[n]||!1},h=[];var g=function(e,t){(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver(function(e){e.forEach(function(e){h.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),r).observe(e),h.push([e,t])},m=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',n=e.sizes?'sizes="'+e.sizes+'" ':"",o=e.srcSetWebp?"<source type='image/webp' srcSet=\""+e.srcSetWebp+'" '+n+"/>":"",r=e.srcSet?'<source srcSet="'+e.srcSet+'" '+n+"/>":"",i=e.title?'title="'+e.title+'" ':"",a=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",c=e.opacity?e.opacity:"1";return"<picture>"+o+r+"<img "+s+l+t+a+i+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+c+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},b=c.default.forwardRef(function(e,t){var n=e.style,o=e.onLoad,r=e.onError,i=(0,s.default)(e,["style","onLoad","onError"]);return c.default.createElement("img",(0,l.default)({},i,{onLoad:o,onError:r,ref:t,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))});b.propTypes={style:u.default.object,onError:u.default.func,onLoad:u.default.func};var y=function(e){function t(t){var n;n=e.call(this,t)||this;var o=!0,r=!1,i=t.fadeIn,s=p(t);!s&&"undefined"!=typeof window&&window.IntersectionObserver&&(o=!1,r=!0),"undefined"==typeof window&&(o=!1),t.critical&&(o=!0,r=!1);var l=!(n.props.critical&&!n.props.fadeIn);return n.state={isVisible:o,imgLoaded:!1,IOSupported:r,fadeIn:i,hasNoScript:l,seenBefore:s},n.imageRef=c.default.createRef(),n.handleImageLoaded=n.handleImageLoaded.bind((0,a.default)((0,a.default)(n))),n.handleRef=n.handleRef.bind((0,a.default)((0,a.default)(n))),n}(0,i.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:p(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},n.handleRef=function(e){var t=this;this.state.IOSupported&&e&&g(e,function(){t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:p(t.props)}),t.setState({isVisible:!0,imgLoaded:!1})})},n.handleImageLoaded=function(){var e,t,n;e=this.props,t=d(e),n=t.fluid?t.fluid.src:t.fixed.src,f[n]=!0,this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},n.render=function(){var e=d(this.props),t=e.title,n=e.alt,o=e.className,r=e.style,i=void 0===r?{}:r,a=e.imgStyle,s=void 0===a?{}:a,u=e.placeholderStyle,f=void 0===u?{}:u,p=e.placeholderClassName,h=e.fluid,g=e.fixed,y=e.backgroundColor,w=e.Tag,v="boolean"==typeof y?"lightgray":y,S=(0,l.default)({opacity:this.state.imgLoaded?0:1,transition:"opacity 0.5s",transitionDelay:this.state.imgLoaded?"0.5s":"0.25s"},s,f),E=(0,l.default)({opacity:this.state.imgLoaded||!1===this.state.fadeIn?1:0,transition:!0===this.state.fadeIn?"opacity 0.5s":"none"},s),O={title:t,alt:this.state.isVisible?"":n,style:S,className:p};if(h){var j=h;return c.default.createElement(w,{className:(o||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},i),ref:this.handleRef,key:"fluid-"+JSON.stringify(j.srcSet)},c.default.createElement(w,{style:{width:"100%",paddingBottom:100/j.aspectRatio+"%"}}),j.base64&&c.default.createElement(b,(0,l.default)({src:j.base64},O)),j.tracedSVG&&c.default.createElement(b,(0,l.default)({src:j.tracedSVG},O)),v&&c.default.createElement(w,{title:t,style:{backgroundColor:v,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&c.default.createElement("picture",null,j.srcSetWebp&&c.default.createElement("source",{type:"image/webp",srcSet:j.srcSetWebp,sizes:j.sizes}),c.default.createElement("source",{srcSet:j.srcSet,sizes:j.sizes}),c.default.createElement(b,{alt:n,title:t,src:j.src,style:E,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:m((0,l.default)({alt:n,title:t},j))}}))}if(g){var _=g,z=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:_.width,height:_.height},i);return"inherit"===i.display&&delete z.display,c.default.createElement(w,{className:(o||"")+" gatsby-image-wrapper",style:z,ref:this.handleRef,key:"fixed-"+JSON.stringify(_.srcSet)},_.base64&&c.default.createElement(b,(0,l.default)({src:_.base64},O)),_.tracedSVG&&c.default.createElement(b,(0,l.default)({src:_.tracedSVG},O)),v&&c.default.createElement(w,{title:t,style:{backgroundColor:v,width:_.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:_.height}}),this.state.isVisible&&c.default.createElement("picture",null,_.srcSetWebp&&c.default.createElement("source",{type:"image/webp",srcSet:_.srcSetWebp,sizes:_.sizes}),c.default.createElement("source",{srcSet:_.srcSet,sizes:_.sizes}),c.default.createElement(b,{alt:n,title:t,width:_.width,height:_.height,src:_.src,style:E,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:m((0,l.default)({alt:n,title:t,width:_.width,height:_.height},_))}}))}return null},t}(c.default.Component);y.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var w=u.default.shape({width:u.default.number.isRequired,height:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string}),v=u.default.shape({aspectRatio:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,sizes:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string});y.propTypes={resolutions:w,sizes:v,fixed:w,fluid:v,fadeIn:u.default.bool,title:u.default.string,alt:u.default.string,className:u.default.oneOfType([u.default.string,u.default.object]),critical:u.default.bool,style:u.default.object,imgStyle:u.default.object,placeholderStyle:u.default.object,placeholderClassName:u.default.string,backgroundColor:u.default.oneOfType([u.default.string,u.default.bool]),onLoad:u.default.func,onError:u.default.func,onStartLoad:u.default.func,Tag:u.default.string};var S=y;t.default=S},357:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=a(n(0)),i=a(n(164));function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return r.default.createElement(i.default,o({viewBox:"0 0 40 40"},e),r.default.createElement("g",null,r.default.createElement("path",{d:"m19.8 26.4l2.6-2.6-3.4-3.4-2.6 2.6v1.3h2.2v2.1h1.2z m9.8-16q-0.3-0.4-0.7 0l-7.8 7.8q-0.4 0.4 0 0.7t0.7 0l7.8-7.8q0.4-0.4 0-0.7z m1.8 13.2v4.3q0 2.6-1.9 4.5t-4.5 1.9h-18.6q-2.6 0-4.5-1.9t-1.9-4.5v-18.6q0-2.7 1.9-4.6t4.5-1.8h18.6q1.4 0 2.6 0.5 0.3 0.2 0.4 0.5 0.1 0.4-0.2 0.7l-1.1 1.1q-0.3 0.3-0.7 0.1-0.5-0.1-1-0.1h-18.6q-1.4 0-2.5 1.1t-1 2.5v18.6q0 1.4 1 2.5t2.5 1h18.6q1.5 0 2.5-1t1.1-2.5v-2.9q0-0.2 0.2-0.4l1.4-1.5q0.3-0.3 0.8-0.1t0.4 0.6z m-2.1-16.5l6.4 6.5-15 15h-6.4v-6.5z m9.9 3l-2.1 2-6.4-6.4 2.1-2q0.6-0.7 1.5-0.7t1.5 0.7l3.4 3.4q0.6 0.6 0.6 1.5t-0.6 1.5z"})))},e.exports=t.default},589:function(e,t,n){"use strict";e.exports=n(590)},590:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=s(n(0)),a=s(n(4));function s(e){return e&&e.__esModule?e:{default:e}}var l=["shortname","identifier","title","url","category_id","onNewComment","language"],c=!1;function u(e,t){var n=t.onNewComment,o=t.language,r=function(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}(t,["onNewComment","language"]);for(var i in r)e.page[i]=r[i];e.language=o,n&&(e.callbacks={onNewComment:[n]})}var d=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),r(t,[{key:"componentDidMount",value:function(){this.loadDisqus()}},{key:"componentDidUpdate",value:function(){this.loadDisqus()}},{key:"shouldComponentUpdate",value:function(e,t){return e.identifier!==this.props.identifier}},{key:"render",value:function(){var e=this,t=Object.keys(this.props).reduce(function(t,n){return l.some(function(e){return e===n})?t:o({},t,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},n,e.props[n]))},{});return i.default.createElement("div",t,i.default.createElement("div",{id:"disqus_thread"}))}},{key:"addDisqusScript",value:function(){if(!c){var e=this.disqus=document.createElement("script"),t=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];e.async=!0,e.type="text/javascript",e.src="//"+this.props.shortname+".disqus.com/embed.js",t.appendChild(e),c=!0}}},{key:"loadDisqus",value:function(){var e=this,t={};l.forEach(function(n){"shortname"!==n&&e.props[n]&&(t[n]=e.props[n])}),"undefined"!=typeof DISQUS?DISQUS.reset({reload:!0,config:function(){u(this,t),this.page.url=this.page.url.replace(/#/,"")+"#!newthread"}}):(window.disqus_config=function(){u(this,t)},this.addDisqusScript())}}]),t}();d.displayName="DisqusThread",d.propTypes={id:a.default.string,shortname:a.default.string.isRequired,identifier:a.default.string,title:a.default.string,url:a.default.string,category_id:a.default.string,onNewComment:a.default.func,language:a.default.string},d.defaultProps={url:"undefined"==typeof window?null:window.location.href},t.default=d}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-27b25de8745809c8fc1f.js.map