const validationTypes = response => {
  const types = []

  if (typeof response !== 'object') {
    return types
  }

  for (let key in response) {
    if (!response.hasOwnProperty(key)) {
      continue
    }

    if (!response[key][0].includes('validation')) {
      continue
    }
    // Response always looks like: "validation.unique" => It's separated by a dot
    const type = Reflect.get(response, key)[0].split('.')[1]

    types.push({
      field: key,
      type
    })
  }

  return types
}

export {
  validationTypes
}
