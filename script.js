const ipJson = [];
const btnGetIp = document.querySelector('#btnGetIp');
const inputIpAddress = document.querySelector('#inputIpAddress');
const ipTable = document.querySelector('#ipTable');
let ipTableBody;

btnGetIp.addEventListener('click', addIp);

inputIpAddress.addEventListener('keypress', function (e) {
  if (e.key === "Enter") addIp();
});

function addIp() {
  const ipAddress = inputIpAddress.value.trim();

  if (!ipAddress) {
    const alertInfo = document.querySelector('#alert-info');
    alertInfo.innerHTML = `
      <div class="alert alert-warning">
        <strong>Opa!</strong> Parece que você não digitou um IP válido.
      </div>
    `;
    return;
  }

  if (ipJson.length === 0) {
    document.querySelector('.tabela').style.display = 'block';
    ipTable.innerHTML = `
      <thead>
        <tr><th>IP</th><th>Org</th><th>Country</th><th>City</th><th>Remover</th></tr>
      </thead>
      <tbody></tbody>
    `;
  }

  const exists = ipJson.some(ipObj => ipObj.ip === ipAddress);
  if (exists) return;

  ipTableBody = document.querySelector('tbody');
  const url = `https://ipinfo.io/${ipAddress}/json?token=ea38c5437881ca`; // substitua pelo seu token

  fetch(url)
    .then(response => response.json())
    .then(values => {
      const ip = values.ip || ipAddress;
      const city = values.city || '-';
      const country = values.country || '-';
      const org = values.org ? values.org.substring(values.org.indexOf(' ') + 1) : '-';

      const addJson = {
        ip,
        city,
        country,
        org,
        close: `<i class="fa fa-times ${ipJson.length}" style="font-size: 20px;"></i>`
      };

      ipJson.unshift(addJson); // adiciona no topo
      render();
    })
    .catch(() => {
      alert("Erro ao buscar IP. Verifique se ele é válido.");
    });
}

function render() {
  let textTable = "";

  for (let i = 0; i < ipJson.length; i++) {
    textTable += `
      <tr>
        <td>${ipJson[i].ip}</td>
        <td>${ipJson[i].org}</td>
        <td>${ipJson[i].country}</td>
        <td>${ipJson[i].city}</td>
        <td><a href="#">${ipJson[i].close}</a></td>
      </tr>
    `;
  }

  ipTableBody.innerHTML = textTable;

  const icons = document.querySelectorAll('i.fa-times');

  icons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      ipJson.splice(index, 1);
      render();
    });
  });
}
