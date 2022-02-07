# Key Match Action

A simple action that looks for multiple regex matches, in a input text, and returns the key of the first found match. 

## TO RUN

Add the step to your github action yml

```yaml
steps:
  - name: Manual Action Test
    id: match
    uses: ChristofferDahlen/Multi-Regex-Match@v1
    with:
      input: "This is the test string. It contains cats "
      json_match: '{ "(?i)(dog|cat)" : "animal", "(?i)(volvo|BMW)" : "(volvo|BMW)"}' # Imbedded json 
```

The output can then be acessed as ``${{ steps.match.outputs.result }}``


## Parameters

| Input | Description | Required | 
| --- | --- | ---  |
| `json_match` | A json string containing a key-value pairs. The key is the regex expression used for matching (javascript style). The value is the returned output if it has been sucessfully matched. It returns only the first match. If you want to use flags they are embedded as for example `/[\W]*/im` |   yes    |
| `input` | The input string that is used to match against|   yes    |

| Ouput |  Description |
| --- | --- |
| `result` | The key of the first found match |


## Json matching format

**The regex is in the golang dialect**

```json
{ 
"Regexp 1" : "outValue",
"Regexp 2" : "outValue", 
...
}
```
