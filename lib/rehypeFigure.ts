 import {Transformer} from "unified";
import { Parent } from "unist";
import {visit} from "unist-util-visit";


interface CustomElement extends Element{
    properties?: {
        alt?: string,
        [key: string]: any,
    },
}
export function rehypeFigure(): Transformer{ 
    return function Transform(tree){
        visit(tree, 'element', function(node: CustomElement, index, parent: Parent & {tagName?: string} | null) {
            if(node.tagName === "img" && node.properties?.alt){
                const regex = /\|\|/;
                const split = node.properties.alt.split(regex);

                if(split && split.length > 1){
                    node.properties["caption"] = split[1]
                    node.properties["alt"] = split[0];
                    node.properties["figure"] = true;
                    if(parent?.tagName == "p"){
                        parent.tagName = "div";
                    }
                    return;
                } 
                node.properties["figure"] = false;
            }
        })
    }
}
