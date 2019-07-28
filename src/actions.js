import axios from "./axios";

export function getStats() {
    return axios.get("/getstats").then(data => {
        return {
            type: "GET_STATS",
            stats: data
        };
    });
}

export function getUserInfo() {
    return axios.get("/getuserinfo").then(data => {
        return {
            type: "GET_USER",
            info: data
        };
    });
}

export function getVerbOnScreen(val) {
    return axios.get(`/getmore/?id=${val}`).then(data => {
        return {
            type: "SHOW_VERB",
            info: data.data
        };
    });
}

export function getUnapprovedVerbOnScreen(val) {
    return axios.get(`/getmoreunapproved/?id=${val}`).then(data => {
        return {
            type: "SHOW_VERB",
            info: data.data
        };
    });
}

export function getVerbForm(val) {
    return {
        type: "GET_FORM",
        form: false,
        actiontype: val
    };
}

export function closeForm() {
    return {
        type: "CLOSE_FORM",
        form: false
    };
}

export function currentVerb(val) {
    return {
        type: "CURREMT_VERB",
        verbId: val
    };
}

export function getInsertions() {
    return axios.get(`/getinsertions`).then(data => {
        return {
            type: "GET_INSERTIONS",
            insertions: data
        };
    });
}

export function getAllInsertions() {
    return axios.get(`/getallinsertions`).then(data => {
        return {
            type: "GET_ALLINSERTIONS",
            insertions: data
        };
    });
}

export function deleteInsertions(val) {
    return axios.get(`/deleteinsertions/?id=${val}`).then(() => {
        return {
            type: "DELETE_INSERTIONS",
            removed: val
        };
    });
}

export function dismiss(val) {
    return axios.get(`/dismiss/?id=${val}`).then(() => {
        return {
            type: "DISMISS",
            dismissed: val
        };
    });
}

export function approve(val, type) {
    return axios.get(`/approve/?id=${val}&type=${type}`).then(() => {
        return {
            type: "APPROVE",
            approved: val
        };
    });
}

export function acceptApplication(val) {
    return axios.get(`/acceptapplication/?id=${val}`).then(() => {
        return {
            type: "ACCEPT_APPLIC",
            user: val
        };
    });
}

export function apply(val) {
    return axios.get(`/apply/?id=${val}`).then(() => {
        return {
            type: "APPLY",
            user: val
        };
    });
}

export function cancelapply(val) {
    return axios.get(`/cancelapply/?id=${val}`).then(() => {
        return {
            type: "CANCEL_APPLY",
            user: val
        };
    });
}

export function getUsers() {
    return axios.get(`/getUsers`).then(data => {
        return {
            type: "GET_USERS",
            users: data
        };
    });
}

export function getMessages() {
    return axios.get(`/getmessages`).then(data => {
        return {
            type: "GET_MESSAGES",
            messages: data
        };
    });
}

export function askApi(val) {
    return axios.get(`/pons/?verb=${val}`).then(data => {
        return {
            type: "GET_TRANS",
            trans: JSON.parse(data.data)
        };
    });
}

export function askApi2(val) {
    return axios({
        method: "get",
        url: `https://www.openthesaurus.de/synonyme/search?q=${val}&format=application/json`
    })
        .then(data => {
            return {
                type: "GET_SYNONYM",
                synonyms: data.data.synsets[0]
            };
        })
        .catch(err => {
            console.log(err);
        });
}
