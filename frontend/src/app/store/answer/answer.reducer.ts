import { AnswerThread } from '../../models/answer.thread.model';
import { CompletedQuestion } from '../../models/completed.question.model';
import { AnswerActions, AnswerActionTypes } from './answer.actions';
export class AnswerState {
    threads: AnswerThread[] = []
    urgent: boolean = undefined
    page = 1
    pageSize = 10
    totalItems: number = undefined
    totalPages: number = undefined
    threadsLoading = false
    threadsError = false

    selectedAnswer: CompletedQuestion[]
    selectedLoading = false
    selectedError = false
    observerId: number
    sectionId: number
}
export let initialAnswerState: AnswerState = new AnswerState()

export function answerReducer(state = initialAnswerState, action: AnswerActions) {
    switch (action.type) {
        case AnswerActionTypes.LOAD_PREVIEW:
            let newList = action.payload.refresh || (action.payload.urgent !== state.urgent),
                shouldLoadList = shouldLoad(action.payload.page,action.payload.pageSize,state.threads.length);
            let newState = Object.assign({}, state, {
                page: action.payload.page,
                pageSize: action.payload.pageSize,
                threads: newList ? [] : state.threads,
                threadsLoading: shouldLoadList,
                threadsError: false,
                urgent: action.payload.urgent
            })
            // if we're loading a new list, deselect any selected answer
            if (newList) {
                newState = Object.assign({}, newState, {
                    selectedAnswer: undefined,
                    selectedLoading: false,
                    selectedError: false,
                    observerId: undefined,
                    sectionId: undefined
                })
            }
            return newState;

        case AnswerActionTypes.LOAD_PREVIEW_ERROR:
            return Object.assign({}, state, {
                threadsLoading: false,
                threadsError: true,

            })
        case AnswerActionTypes.LOAD_PREVIEW_DONE:
            return Object.assign({}, state, {
                threads: state.threads.concat(action.payload.threads),
                totalItems: action.payload.totalItems,
                totalPages: action.payload.totalPages,
                threadsLoading: false,
                threadsError: false
            })
        case AnswerActionTypes.LOAD_DETAILS:
            return Object.assign({}, state, action.payload, {
                selectedLoading: true,
                selectedError: false
            })
        case AnswerActionTypes.LOAD_DETAILS_ERROR:
            return Object.assign({}, state, {
                selectedLoading: false,
                selectedError: true
            })
        case AnswerActionTypes.LOAD_DETAILS_DONE:
            return Object.assign({}, state, {
                selectedAnswer: action.payload,
                selectedLoading: false,
                selectedError: false
            })
        default:
            return state
    }
}

export function shouldLoad(page: number, pageSize: number, arrayLen) {
    if (page === undefined || pageSize === undefined) {
        return true;
    }

    return page * pageSize > arrayLen;
}