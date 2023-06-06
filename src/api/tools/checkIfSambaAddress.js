function checkIfSambaAddress(path) {
  const regex = /^(smb:\/\/|\\\\)[\w.-]+(\/[\w.-]+)*$/
  return regex.test(path) || path.startsWith('\\\\')
}

export default checkIfSambaAddress