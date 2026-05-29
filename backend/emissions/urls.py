from django.urls import path
from .views import lock_record

from .views import (

    get_records,

    upload_sap,

    upload_utility,

    upload_travel,

    approve_record,

    reject_record,

    lock_record
)

urlpatterns = [

    path(
        'api/records/',
        get_records
    ),

    path(
        'api/upload-sap/',
        upload_sap
    ),

    path(
        'api/upload-utility/',
        upload_utility
    ),

    path(
        'api/upload-travel/',
        upload_travel
    ),

    path(
        'api/approve/<int:id>/',
        approve_record
    ),

    path(
        'api/reject/<int:id>/',
        reject_record
    ),

    path(
        'api/lock/<int:id>/',
        lock_record
    ),
    path(
    'api/lock/<int:id>/',
    lock_record
),

]