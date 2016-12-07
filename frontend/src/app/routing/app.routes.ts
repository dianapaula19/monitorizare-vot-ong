import { StatisticsDetailsComponent } from '../components/statistics/statistics-details/statistics-details.component';
import { AnswerDetailsComponent } from '../components/answer/answer-details/answer-details.component';
import { AnswerListComponent } from '../components/answer/answers-list/answer-list.component';
import { LoadStatisticsGuard } from './guards/load-statistics.guard';
import { AnswerDetailsGuard } from './guards/load-anwer-details.guard';
import { AnswerListGuard } from './guards/load-answer-list.guard';
import { HomeGuard } from './guards/home.guard';
import { StatisticsComponent } from '..//components/statistics/statistics.component';
import { LoadAnswerDetailsAction, LoadAnswerPreviewAction } from '..//store/answer/answer.actions';
import { AppState } from '..//store/store.module';
import { AnswerComponent } from '..//components/answer/answer.component';
import { Store } from '@ngrx/store';
import { Routes } from '@angular/router';

export let appRoutes: Routes = [
    {
        // name: 'home',
        path: '',
        pathMatch: 'full',
        canActivate: [HomeGuard],
        redirectTo: '/raspunsuri/urgente'
    }, {
        path: 'raspunsuri',
        component: AnswerComponent,
        canActivate: [AnswerListGuard],
        children: [{
            path: 'detalii/:idObservator/:idSectie',
            component: AnswerDetailsComponent,
            canActivate: [AnswerDetailsGuard]
        }, {
            path: '',
            component: AnswerDetailsComponent
        }]
    },
    {
        path: 'raspunsuri/urgente',
        component: AnswerComponent,
        canActivate: [AnswerListGuard],
        data:{
            urgent: true
        },
        children: [{
            path: 'detalii/:idObservator/:idSectie',
            component: AnswerDetailsComponent,
            canActivate: [AnswerDetailsGuard]
        }, {
            path: '',
            component: AnswerDetailsComponent
        }]
    },
    {
        path: 'statistici',
        component: StatisticsComponent,
        canActivate: [LoadStatisticsGuard]
    }, {
        path: 'statistici/:key',
        component: StatisticsDetailsComponent,
        canActivate: [LoadStatisticsGuard]
    }
]