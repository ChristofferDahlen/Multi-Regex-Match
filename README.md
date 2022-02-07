# Key Match Action

A simple action that checks if a string is matched against a specific regexp. Returns the key for the first matched regexp 

´´´
{ "output-key1" : "Regexp1",
  "output-key2" : "Regexp2}
}
´´´

# Example

We have the following input

´´´
this string has animals: horse
and cars: Volvo 
´´´

with the json match

´´´
{ "Car" : "/(volvo|BMW)/im", "animal" : "(dog|cat)" }
´´´

We get the following result

´´´
Car
´´´