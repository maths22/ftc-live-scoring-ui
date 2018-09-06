import generate from "shortid";

export default class Api {
  constructor () {
    this.clientId = window.localStorage.getItem("clientId");
    if(!this.clientId) {
      this.clientId = generate();
      window.localStorage.setItem("clientId", this.clientId);
    }
  }

  getRequest(path, fn) {
    fetch('/api/' + path, {
      headers: {
        "Client-Id": this.clientId
      },
    })
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
        "Client-Id": this.clientId
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
    this.postRequest(`/match/${id}/random`, {field: field, random: number}, fn)
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

  savePenalties(id, alliance, data, fn) {
    this.postRequest(`/match/${id}/penalties`, {alliance, data}, fn)
  }

  saveAlliance(id, alliance, data, fn) {
    this.postRequest(`/match/${id}/alliance`, {alliance, data}, fn)
  }

  submit(id, data, fn) {
    this.postRequest(`/match/${id}/submit`, data, fn)
  }

  configurePrinter(fn) {
    this.postRequest(`/config/printer`, {}, fn)
  }

  reset(fn) {
    this.postRequest(`/config/reset`, {}, fn)
  }

  resetMatch(id, fn) {
    this.postRequest(`/match/${id}/reset`, {}, fn)
  }
}