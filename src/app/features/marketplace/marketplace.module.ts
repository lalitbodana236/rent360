import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MarketplaceComponent } from './marketplace.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
    data: {
      title: 'Marketplace',
      subtitle: 'Public listings and owner inquiry pipeline',
      description: 'Marketplace scaffold as per PRODUCT-DEFINATION.',
    },
  },
  { path: 'listings', component: MarketplaceComponent, data: { title: 'Listings', subtitle: 'Rent and sale listings', description: 'Listings scaffold.' } },
  { path: 'property-detail', component: MarketplaceComponent, data: { title: 'Property Detail', subtitle: 'Listing details and amenities', description: 'Property detail scaffold.' } },
  { path: 'media-gallery', component: MarketplaceComponent, data: { title: 'Media Gallery', subtitle: 'Photos and videos', description: 'Media gallery scaffold.' } },
  { path: 'inquiries', component: MarketplaceComponent, data: { title: 'Inquiries', subtitle: 'Lead and inquiry tracking', description: 'Inquiries scaffold.' } },
  { path: 'favorites', component: MarketplaceComponent, data: { title: 'Favorites', subtitle: 'Saved properties', description: 'Favorites scaffold.' } },
];

@NgModule({ declarations: [MarketplaceComponent], imports: [SharedModule, RouterModule.forChild(routes)] })
export class MarketplaceModule {}
