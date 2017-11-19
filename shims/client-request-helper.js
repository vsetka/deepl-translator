module.exports = ({ protocol, hostname, path }, postBody) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${protocol}//${hostname}${path}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        xhr.status == 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject(xhr.status);
      }
    };
    xhr.send(JSON.stringify(postBody));
  });
};
