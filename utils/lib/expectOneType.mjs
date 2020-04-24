export function expectOneType(prop,expectType){
    if(typeof prop !== expectType){
        throw new Error(`in CreateUpdate：Expecting an ${expectType} parameter，but get ${typeof prop}.`)
    }
    return prop;
}

