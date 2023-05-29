export function getAuth0Id(auth0Id: any) {
    const id = auth0Id?.substring(6, 11)

    return parseInt(id, 10)
  }