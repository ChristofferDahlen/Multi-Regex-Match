const core = require('@actions/core');
const github = require('@actions/github');


try {
    // `who-to-greet` input defined in action metadata file
    const inputJsonText = core.getInput('json_match', {required: true});

    core.debug(`inputJsonText: ${inputJsonText}`)
    const jsonData = JSON.parse(inputJsonText);

    const input = core.getInput('input', {required: true});
    core.debug(`input: ${input}`)

    const cont = core.getInput('success_if_no_match');
    core.debug(`cont: ${cont}`)

    let output = ""

    for(const key in jsonData){
        if(jsonData.hasOwnProperty(key)){
            const regexp = key;
            core.debug(`regexp:  ${regexp}`)

            const out = jsonData[key];
            core.debug(`output:  ${out}`)

            const matching = regexp.match(input);

            core.debug(`Match: ${JSON.stringify(matching)}`)

            if(matching != null) {

                output = out;
                break;
            }

        }
    }

    core.setOutput("result", output);
    if(!cont && !output)
        core.setFailed("Couldn't find any matches")


} catch (error) {
    core.setFailed(error.message);
}