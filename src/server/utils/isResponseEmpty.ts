const isResponseEmpty = (response: string | string[]) => {
  if(Array.isArray(response)) {
    return response.length === 0
  }
  return response.trim() === ""
}

export { isResponseEmpty }