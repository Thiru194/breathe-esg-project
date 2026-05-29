import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import EmissionRecord
from .serializers import EmissionSerializer


# =========================================
# GET ALL RECORDS
# =========================================

@api_view(['GET'])
def get_records(request):

    records = EmissionRecord.objects.all().order_by('-id')

    serializer = EmissionSerializer(records, many=True)

    return Response(serializer.data)


# =========================================
# COMMON CSV VALIDATION FUNCTION
# =========================================

def validate_csv_file(request):

    if 'file' not in request.FILES:

        return None, Response(
            {"error": "No file uploaded"},
            status=status.HTTP_400_BAD_REQUEST
        )

    file = request.FILES['file']

    if not file.name.endswith('.csv'):

        return None, Response(
            {"error": "Only CSV files are allowed"},
            status=status.HTTP_400_BAD_REQUEST
        )

    return file, None


# =========================================
# SAP UPLOAD
# =========================================

@api_view(['GET', 'POST'])
def upload_sap(request):

    # GET REQUEST
    if request.method == 'GET':

        return Response({
            "message": "SAP Upload API Working"
        })

    # POST REQUEST
    try:

        file, error_response = validate_csv_file(request)

        if error_response:
            return error_response

        df = pd.read_csv(file)

        uploaded_count = 0

        for _, row in df.iterrows():

            suspicious = False

            fuel_amount = float(row['fuel_amount'])

            # Suspicious condition
            if fuel_amount < 0 or fuel_amount > 100000:

                suspicious = True

            EmissionRecord.objects.create(

                company_name=row['company_name'],

                source_type='SAP',

                category='Scope1',

                raw_data=row.to_dict(),

                normalized_data={
                    "fuel_liters": fuel_amount
                },

                suspicious=suspicious,

                status='PENDING'
            )

            uploaded_count += 1

        return Response({

            "message": "SAP upload successful",

            "records_uploaded": uploaded_count

        }, status=status.HTTP_201_CREATED)

    except Exception as e:

        return Response({

            "error": str(e)

        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# =========================================
# UTILITY UPLOAD
# =========================================

@api_view(['GET', 'POST'])
def upload_utility(request):

    # GET REQUEST
    if request.method == 'GET':

        return Response({
            "message": "Utility Upload API Working"
        })

    # POST REQUEST
    try:

        file, error_response = validate_csv_file(request)

        if error_response:
            return error_response

        df = pd.read_csv(file)

        uploaded_count = 0

        for _, row in df.iterrows():

            suspicious = False

            electricity_kwh = float(row['electricity_kwh'])

            # Suspicious condition
            if electricity_kwh > 50000:

                suspicious = True

            EmissionRecord.objects.create(

                company_name=row['company_name'],

                source_type='UTILITY',

                category='Scope2',

                raw_data=row.to_dict(),

                normalized_data={
                    "electricity_kwh": electricity_kwh
                },

                suspicious=suspicious,

                status='PENDING'
            )

            uploaded_count += 1

        return Response({

            "message": "Utility upload successful",

            "records_uploaded": uploaded_count

        }, status=status.HTTP_201_CREATED)

    except Exception as e:

        return Response({

            "error": str(e)

        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# =========================================
# TRAVEL UPLOAD
# =========================================

@api_view(['GET', 'POST'])
def upload_travel(request):

    # GET REQUEST
    if request.method == 'GET':

        return Response({
            "message": "Travel Upload API Working"
        })

    # POST REQUEST
    try:

        file, error_response = validate_csv_file(request)

        if error_response:
            return error_response

        df = pd.read_csv(file)

        uploaded_count = 0

        for _, row in df.iterrows():

            suspicious = False

            distance_km = float(row['distance_km'])

            # Suspicious condition
            if distance_km < 50:

                suspicious = True

            EmissionRecord.objects.create(

                company_name=row['company_name'],

                source_type='TRAVEL',

                category='Scope3',

                raw_data=row.to_dict(),

                normalized_data={
                    "distance_km": distance_km
                },

                suspicious=suspicious,

                status='PENDING'
            )

            uploaded_count += 1

        return Response({

            "message": "Travel upload successful",

            "records_uploaded": uploaded_count

        }, status=status.HTTP_201_CREATED)

    except Exception as e:

        return Response({

            "error": str(e)

        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # APPROVE RECORD

@api_view(['PATCH'])
def approve_record(request, id):

    try:

        record = EmissionRecord.objects.get(id=id)

        record.status = 'APPROVED'

        record.save()

        return Response({
            "message": "Record Approved"
        })

    except Exception as e:

        return Response({
            "error": str(e)
        })


# REJECT RECORD

@api_view(['PATCH'])
def reject_record(request, id):

    try:

        record = EmissionRecord.objects.get(id=id)

        record.status = 'REJECTED'

        record.save()

        return Response({
            "message": "Record Rejected"
        })

    except Exception as e:

        return Response({
            "error": str(e)
        })
    # LOCK RECORD

@api_view(['PATCH'])
def lock_record(request, id):

    try:

        record = EmissionRecord.objects.get(id=id)

        record.locked = True

        record.save()

        return Response({
            "message": "Record Locked"
        })

    except Exception as e:

        return Response({
            "error": str(e)
        })
    # LOCK RECORD

@api_view(['PATCH'])
def lock_record(request, id):

    try:

        record = EmissionRecord.objects.get(id=id)

        record.locked = True

        record.save()

        return Response({
            "message": "Record Locked Successfully"
        })

    except Exception as e:

        return Response({
            "error": str(e)
        })