export function expectOneType(prop,expectType,fnName){
    if(typeof prop !== expectType){
        throw new Error(`in ${fnName?fnName:'MWjs'}: Expecting an ${expectType} parameter，but get ${typeof prop}.`)
    }
    return prop;
}

