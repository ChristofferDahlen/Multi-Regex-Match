package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"regexp"
	"strings"
)

func main() {
	fmt.Printf("t")
	//checkRegexp(`{ "test\\s" : "test"}`, "test b", true)

	if err := run(context.Background()); err != nil {
		log.Fatal(err)
	}
}

func Debug(msg string) {
	fmt.Printf("\n::debug::%s", msg)
}

func Output(key string, value string) {
	fmt.Printf("\n::set-output name=%s::%s", key, value)

}

func checkRegexp(jsonData string, input string, check bool) error {
	dat := make(map[string]string)
	err := json.Unmarshal([]byte(jsonData), &dat)
	if err != nil {
		panic(err)
	}

	Debug(input)

	for key, value := range dat {
		reg := regexp.MustCompile(key)

		Debug("Regexp: " + key)
		Debug("OutKey: " + value)

		match := reg.MatchString(input)
		if match {
			Output("result", value)
			break
		}
	}

	if check {
		err = fmt.Errorf("cannot find match")
	}

	return err
}

func run(context.Context) error {

	input := os.Getenv("INPUT_INPUT")
	jsonData := os.Getenv("INPUT_JSON_MATCH")
	checkIfNoFound := os.Getenv("INPUT_FAIL_IF_NO_MATCH")

	check := strings.ToLower(checkIfNoFound) == "true"

	return checkRegexp(jsonData, input, check)
}
