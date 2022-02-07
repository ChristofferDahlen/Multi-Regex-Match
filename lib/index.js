const core = require('@actions/core');
const github = require('@actions/github');


try {
    // `who-to-greet` input defined in action metadata file
    const inputJsonText = core.getInput('json_match', {required: true});

    core.debug(`inputJsonText: ${inputJsonText}`)
    const jsonData = JSON.parse(inputJsonText);

    const input = core.getInput('input', {required: true});
    core.debug(`input: ${input}`)

    let output = ""

    for(const key in jsonData){
        if(jsonData.hasOwnProperty(key)){
            core.debug(`regexp:  ${key}`)

            const regexp = key;
            core.debug(`output:  ${regexp}`)

            const matching = regexp.match(input);

            core.debug(`Match: ${JSON.stringify(matching)}`)

            if(matching != null) {

                output = jsonData[key];
                break;
            }

        }
    }
    core.setOutput("result", output);

} catch (error) {
    core.setFailed(error.message);
}