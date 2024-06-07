export const fetchNetworks = () =>
    fetch("https://api.citybik.es/v2/networks").then((res) => res.json());

export const fetchNetwork = (id: string) =>
    () => fetch(`https://api.citybik.es/v2/networks/${id}`).then((res) => res.json());
