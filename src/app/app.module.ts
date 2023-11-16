import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { DisplayCategoryComponent } from './components/display-category/display-category.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { DatabaseService } from './services/database.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import { DeleteEventComponent } from './components/delete-event/delete-event.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransformNamePipe } from './pipes/transform-name.pipe';
import { StatsComponent } from './components/stats/stats.component';
import { SpeechBotComponent } from './components/speech-bot/speech-bot.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { TransformTimePipe } from './pipes/transform-time.pipe';
import { TransformDurationPipe } from './pipes/transform-duration.pipe';
import { TranslationBotComponent } from './components/translation-bot/translation-bot.component';
import { StatsG2Component } from './components/stats-g2/stats-g2.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransformEndDatePipe } from './pipes/transform-end-date.pipe';


const routes: Routes = [
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'list-category', component: ListCategoryComponent },
  { path: 'delete-category', component: DeleteCategoryComponent },
  { path: 'update-category', component: UpdateCategoryComponent },
  { path: 'update-event', component: UpdateEventComponent },
  { path: 'display-category/:categoryId', component: DisplayCategoryComponent },
  { path: 'stats', component: StatsComponent},
  { path: 'stats-g2', component: StatsG2Component},
  { path: 'speech-bot', component: SpeechBotComponent },
  { path: 'translation-bot', component: TranslationBotComponent},

  { path: 'add-event', component: AddEventComponent },
  { path: 'list-events', component: ListEventsComponent },
  { path: 'delete-event', component: DeleteEventComponent },
  { path: 'update-event', component: UpdateEventComponent },
  { path: 'view-event/:eventId', component: ViewEventComponent },

  { path: 'invalid-data', component: InvalidDataComponent },
  { path: '', pathMatch:'full', redirectTo:'add-category'},
  { path: '**', component: PageNotFoundComponent}
  ]


@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    UpdateCategoryComponent,
    DisplayCategoryComponent,
    ViewEventComponent,
    DeleteCategoryComponent,
    PageNotFoundComponent,
    FooterComponent,
    AddEventComponent,
    ListEventsComponent,
    DeleteEventComponent,
    UpdateEventComponent,
    InvalidDataComponent,
    TransformNamePipe,
    StatsComponent,
    SpeechBotComponent,
    TranslationBotComponent,
    TransformTimePipe,
    TransformDurationPipe,
    StatsG2Component,
    TransformEndDatePipe,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule.forRoot(routes,{ useHash: true }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
