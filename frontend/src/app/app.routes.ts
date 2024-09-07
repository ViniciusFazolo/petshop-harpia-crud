import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListAnimalComponent } from './pages/animal/list-animal/list-animal.component';
import { FormAnimalComponent } from './pages/animal/form-animal/form-animal.component';
import { ListClientComponent } from './pages/client/list-client/list-client.component';
import { FormClientComponent } from './pages/client/form-client/form-client.component';
import { ListProductComponent } from './pages/product/list-product/list-product.component';
import { FormProductComponent } from './pages/product/form-product/form-product.component';
import { FormOrderComponent } from './pages/order/form-order/form-order.component';
import { ListOrderComponent } from './pages/order/list-order/list-order.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'animal',
        component: ListAnimalComponent,
    },
    {
        path: 'animal/new',
        component: FormAnimalComponent
    },
    {
        path: 'animal/:id',
        component: FormAnimalComponent
    },
    {
        path: 'client',
        component: ListClientComponent
    },
    {
        path: 'client/new',
        component: FormClientComponent
    },
    {
        path: 'client/:id',
        component: FormClientComponent
    },
    {
        path: 'product',
        component: ListProductComponent
    },
    {
        path: 'product/new',
        component: FormProductComponent
    },
    {
        path: 'product/:id',
        component: FormProductComponent
    },
    {
        path: 'order',
        component: ListOrderComponent
    },
    {
        path: 'order/new',
        component: FormOrderComponent
    },
    {
        path: 'order/:id',
        component: FormOrderComponent
    },
    {
        path: "**",
        component: HomeComponent
    }
];
