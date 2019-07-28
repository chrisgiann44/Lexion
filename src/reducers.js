export default function reducer(state = { form: true }, action) {
    if (action.type === "GET_STATS") {
        return { ...state, stats: action.stats };
    }
    if (action.type === "SHOW_VERB") {
        return { ...state, verbtoshow: action.info };
    }
    if (action.type === "GET_USER") {
        return { ...state, user: action.info };
    }
    if (action.type === "CLOSE_FORM") {
        return { ...state, form: false, verbtoshow: {}, verbId: "" };
    }
    if (action.type === "GET_FORM") {
        if (state.form) {
            return { ...state, form: false, action: action.actiontype };
        } else {
            return { ...state, form: true, action: action.actiontype };
        }
    }
    if (action.type === "CURREMT_VERB") {
        return { ...state, verbId: action.verbId };
    }
    if (action.type === "CURREMT_VERB") {
        return { ...state, verbId: action.verbId };
    }
    if (action.type === "DELETE_INSERTIONS") {
        let newInsertions = state.insertions.data.filter(
            ins => ins.id != action.removed
        );
        return {
            ...state,
            insertions: { ...state.insertions, data: newInsertions }
        };
    }
    if (action.type === "GET_INSERTIONS") {
        return { ...state, insertions: action.insertions };
    }
    if (action.type === "GET_ALLINSERTIONS") {
        return { ...state, allinsertions: action.insertions };
    }
    if (action.type === "DISMISS") {
        for (let i = 0; i < state.allinsertions.data; i++) {
            if (state.allinsertions.data[i].id == action.dismissed) {
                state.allinsertions.data[i].dismissed = true;
            }
            return {
                state
            };
        }
    }
    if (action.type === "APPROVE") {
        for (let i = 0; i < state.allinsertions.data; i++) {
            if (state.allinsertions.data[i].id == action.approved) {
                state.allinsertions.data[i].approved = true;
            }
            return {
                state
            };
        }
    }
    if (action.type === "APPLY") {
        return {
            ...state,
            user: { ...state.user, data: { ...state.user.data, applied: true } }
        };
    }
    if (action.type === "CANCEL_APPLY") {
        return {
            ...state,
            user: {
                ...state.user,
                data: { ...state.user.data, applied: false }
            }
        };
    }

    if (action.type === "ACCEPT_APPLIC") {
        for (let i = 0; i < state.users.data; i++) {
            if (state.users.data[i].id == action.user) {
                state.users.data[i].admin = true;
            }
            return {
                state
            };
        }
    }

    if (action.type === "GET_USERS") {
        return { ...state, users: action.users };
    }
    if (action.type === "GET_TRANS") {
        let translations =
            action.trans[0].hits[0].roms[0].arabs[0].translations;
        return { ...state, translations: translations };
    }

    if (action.type === "GET_PONS") {
        return { ...state, synonyms: action.synonyms };
    }

    if (action.type === "GET_SYNONYM") {
        return { ...state, synonyms: action.synonyms };
    }

    if (action.type === "GET_MESSAGES") {
        return { ...state, messages: action.messages };
    }
    return state;
}
