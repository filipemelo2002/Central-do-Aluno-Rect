import React from "react";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from "expo-ads-admob";

const BannerIds = ["ca-app-pub-4776387538701328/8977512568"];
export async function Interstitial() {
  AdMobInterstitial.setAdUnitID("ca-app-pub-4776387538701328/2155791258");
  await AdMobInterstitial.requestAdAsync();
  await AdMobInterstitial.showAdAsync();
}
export function BannerAd() {
  return (
    <AdMobBanner
      bannerSize="fullBanner"
      adUnitID={BannerIds[0]}
      servePersonalizedAds={false}
    />
  );
}
