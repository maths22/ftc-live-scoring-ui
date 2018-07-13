export default class Api {
  getRequest(path, fn) {
    fetch('/api/' + path)
      .then(function(response) {
        return response.json();
      })
      .then(fn);
  }

  postRequest(path, data, fn) {
    fetch('/api/' + path, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(function(response) {
        return response.json();
      })
      .then(fn ? fn : () => {});
  }

  getFieldConfig(id, fn) {
    this.getRequest(`/config/${id}`, fn)
  }

  putGlobalConfig(cfg, fn) {
    this.putFieldConfig(0, cfg, fn)
  }

  putFieldConfig(id, cfg, fn) {
    this.postRequest(`/config/${id}`, cfg, fn)
  }

  getMatches(fn) {
    this.getRequest("/match", fn)
  }

  getMatch(id, fn) {
    this.getRequest(`/match/${id}`, fn)
  }

  startMatch(id, fn) {
    this.postRequest(`/match/${id}/start`, {}, fn)
  }

  saveRandom(id, field, number, fn) {
    this.postRequest(`/match/${id}/random`, {field, number}, fn)
  }

  saveAuto(id, alliance, data, fn) {
    this.postRequest(`/match/${id}/auto`, {alliance, data}, fn)
  }

  saveTeleop(id, alliance, data, fn) {
    this.postRequest(`/match/${id}/teleop`, {alliance, data}, fn)
  }

  saveEndgame(id, alliance, data, fn) {
    this.postRequest(`/match/${id}/endgame`, {alliance, data}, fn)
  }

  savePenalties(id, alliance, penalties, allianceData, fn) {
    this.postRequest(`/match/${id}/penalties`, {alliance, data: {penalties, alliance: allianceData}}, fn)
  }

  submit(id, data, fn) {
    this.postRequest(`/match/${id}/submit`, data, fn)
  }
}