type JSONValue = JSONArray | JSONRecord | boolean | null | number | string

interface JSONArray extends Array<JSONValue> {} // eslint-disable-line @typescript-eslint/no-empty-interface

interface JSONRecord extends Record<string, JSONValue> {} // eslint-disable-line @typescript-eslint/no-empty-interface
