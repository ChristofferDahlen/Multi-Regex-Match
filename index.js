const core = require('@actions/core');
const github = require('@actions/github');


try {
    // `who-to-greet` input defined in action metadata file
    const inputJsonText = core.getInput('json_match', {required: true});
    core.debug("json patterns:")
    core.debug(inputJsonText)
    const jsonData = JSON.parse(inputJsonText);

    const input = core.getInput('input', {required: true});
    core.debug("input:" );
    core.debug(input)

    let output = ""

    for(const key in jsonData){
        if(jsonData.hasOwnProperty(key)){
            const regexp = jsonData[key];
            const matching = input.match(regexp);

            if(matching != null) {

                output = key;
                break;
            }

        }
    }
    core.setOutput("result", output);

} catch (error) {
    core.setFailed(error.message);
}