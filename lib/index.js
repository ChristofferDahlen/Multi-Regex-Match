const core = require('@actions/core');
const github = require('@actions/github');



function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


try {
    // `who-to-greet` input defined in action metadata file
    const inputJsonText = core.getInput('json_match', {required: true});

    core.debug(`inputJsonText: ${inputJsonText}`)
    const jsonData = JSON.parse(inputJsonText);

    const input = core.getInput('input', {required: true});
    core.debug(`input: ${input}`)

    const cont = core.getBooleanInput('success_if_no_match');
    core.debug(`cont: ${cont}`)

    let output

    for(const key in jsonData){
        if(jsonData.hasOwnProperty(key)){
            core.debug(`key:  ${key}`);
            const regex = escapeRegExp(key);
            core.debug(`regex:  ${regex}`);
            const regexp = new RegExp(regex)
            const out = jsonData[key];
            core.debug(`output:  ${out}`);

            const matching = input.match(regexp);
            const match2 = regex.exec(input);
            core.debug(`Match: ${JSON.stringify(matching)}`);
            core.debug(`Match: ${JSON.stringify(match2)}`);

            if(matching != null) {
                core.debug("Found match!");
                output = out;
                break;
            } else {
                core.debug("Not matched")
            }

        }
    }

    core.debug(`output: ${output}`);
    core.setOutput("result", output);

    if(!cont && !output){
        core.debug("Missing result");
        core.setFailed("Couldn't find any matches");
    } else {
        core.debug("Success");
    }


} catch (error) {
    core.setFailed(error.message);
}