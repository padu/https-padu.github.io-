const appDomain = 'http://webapi.choja.in';
const locationId = '8b3ae93c-1bbf-4080-b554-0f79fe93681c';
const pageIndex = 1;

const adsWrapper = document.querySelector('#adds-wrapper');
const adsLoc = document.querySelector('#adLocations');

const defaultLoc = {
    "$id": "1",
    "Id": "8b3ae93c-1bbf-4080-b554-0f79fe93681c",
    "Name": "सर्व स्थाने"
};

const noImage = '/images/no-image.png';

window.addEventListener('load', e => {
    updateAdvertisements();
    updateLocations();

    adsLoc.addEventListener('change', e => {
        updateAdvertisements(e.target.value);
    })
})

async function  updateAdvertisements(locId = defaultLoc.Id) {
    const res = await fetch(`${appDomain}/Api/ClassifyAdvertisement/GetClassifyAdvertisementsByLocation?locationId=${locId}&pageIndex=${pageIndex}`);
    const data = await res.json();

    adsWrapper.innerHTML = data.Results.$values.map(createAdvertisement).join('\n');
}

async function updateLocations() {
    const res = await fetch(`${appDomain}/Api/Choja/GetLocations`);
    const data = await res.json();
    adsLoc.innerHTML = `<option value="${defaultLoc.Id}" selected="selected">${defaultLoc.Name}</option>`;

    adsLoc.innerHTML += data.Results.$values.map(loc => `<option value="${loc.Id}">${loc.Name}</option>`).join('\n');
    // $(adsLoc).niceSelect('update');
}

function createAdvertisement(ad) {
    return `
        <div class="item-list">
        <div class="row">
            <div class="col-md-2 no-padding photobox">
                <div class="add-image">
                    <img 
                        class="thumbnail no-margin"
                        src="${ad.FilePath ? appDomain + ad.FilePath: noImage}"
                        alt="img">
                </div>
            </div>
            <!--/.photobox-->
            <div class="col-md-7 add-desc-box">
                <div class="ads-details">
                    <h5 class="add-title">
                        ${ad.AdvertisementText} 
                    </h5>
                    <span class="info-row">
                        <span class="add-type business-ads tooltipHere" data-toggle="tooltip"
                            data-placement="right" title="Business Ads">B </span>
                        <span class="date">
                            <i class=" icon-clock"> </i> ${ad.CreatedOn}</span>-
                        <span class="category">${ad.CategoryName} </span>-
                        <span class="item-location">
                            <i class="fa fa-map-marker-alt"></i> ${ad.LocationName}</span>
                    </span>
                </div>
            </div>
            <!--/.add-desc-box-->
            <div class="col-md-3 text-right  price-box">
                <a class="btn btn-danger  btn-sm make-favorite">
                    <i class="fa fa-certificate"></i>
                    <span>Top Ads</span>
                </a>
                <a class="btn btn-secondary  btn-sm make-favorite">
                    <i class="fa fa-heart"></i>
                    <span>Save</span>
                </a>
            </div>
            <!--/.add-desc-box-->
        </div>
    </div>`;
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(registration => {
            console.log(registration);
        })
        .catch(error => console.log(error));
}