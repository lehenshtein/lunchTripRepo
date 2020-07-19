import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MessagesResolver} from "@shared/resolvers/messages.resolver";

import { MessagesComponent } from './messages.component';

const routes: Routes = [{ path: '', component: MessagesComponent , resolve: {messages: MessagesResolver}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
