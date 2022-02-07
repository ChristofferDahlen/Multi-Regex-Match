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
            core.debug(`output:  ${out}`);

            const matching = regexp.match(input);

            core.debug(`Match: ${JSON.stringify(matching)}`);

            if(matching != null) {
                core.debug("Found match!");
                output = out;
                break;
            }

        }
    }

    core.debug(`cont: ${cont}`);
    core.debug(`output: ${output}`);

    core.debug(`cont: ${!cont}`);
    core.debug(`output: ${!output}`);


    core.setOutput("result", output);
    if(!cont && !output){
        core.debug("Missing result");
        core.setFailed("Couldn't find any matches");
    } else {
        core.debug("Sucess");
    }


} catch (error) {
    core.setFailed(error.message);
}