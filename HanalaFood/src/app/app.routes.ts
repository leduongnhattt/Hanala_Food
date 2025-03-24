import { Routes } from '@angular/router';
import { LoginComponent } from './features/users/login/login.component';
import { RegisterComponent } from './features/users/register/register.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { OrderComponent } from './features/order/order.component';
import { PaymentComponent } from './features/payment/payment.component';
import { ProfileComponent } from './features/users/profile/profile.component';
import { DiscountComponent } from './features/users/discount/discount.component';
import { MyOrdersComponent } from './features/users/my-orders/my-orders.component';
import { OrderDetailComponent } from './features/order-detail/order-detail.component';
import { FoodListComponent } from './features/dashboard/food-list/food-list.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'foods', component: FoodListComponent },
];
