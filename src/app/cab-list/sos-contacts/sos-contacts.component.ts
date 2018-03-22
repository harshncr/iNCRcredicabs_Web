import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-sos-contacts',
  templateUrl: './sos-contacts.component.html',
  styleUrls: ['./sos-contacts.component.css']
})
export class SosContactsComponent implements OnInit {
  
  constructor(private router: Router) { }
  editElem:any;
 
  showDeactivateEditPopup=false;
  showDeactivatePopup   = false;
  selectedIndex : string;
  targetElem:any;

  onAdd()
  {
    this.router.navigateByUrl('/add-contact');
  }

  btnClick= function (elem) {
    this.targetElem=elem;
    this.editElem= Object.assign({},elem);
    this.showDeactivateEditPopup=true;
  };
  hideEditPopup()
  {
    this.showDeactivateEditPopup=false;
  }

  showPopup(i){
    this.showDeactivatePopup = true;
    this.selectedIndex=i;
  }
  changeStatus()
  {
    this.showDeactivatePopup = false;
    this.selectedIndex="-1";    
  }
  hidePopup(){
    this.showDeactivatePopup = false;
    this.selectedIndex="-1";
  }

  onSave(elem)
  {
    // this.targetElem = this.editElem;
    elem=this.editElem;
    this.showDeactivateEditPopup=false;
  }
  
    arr = [
      {
        contactNbr: '9999999999',
        contactName: 'Ayush',
        Qlid: 'ap250625',
        contactRole: 'Trannsport manager',
        contactSos: '0',
        contactSosPriority:'1',
        contactSosStatus:'A',
      },
      {
        contactNbr: '8888888888',
        contactName: 'Abhinav',
        Qlid: 'ap222225',
        contactRole: 'Admin',
        contactSos: '1',
        contactSosPriority:'1',
        contactSosStatus:'A',
      }, 
      {
        contactNbr: '7777777777',
        contactName: 'Anuj',
        Qlid: 'ap250111',
        contactRole: 'Other',
        contactSos: '0', 
        contactSosPriority:'2',
        contactSosStatus:'I',
      }

    ]
   

  ngOnInit() {
    $(document).on('click', '.panel-heading span.clickable', function(e){
        var $this = $(this);
        if(!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon glyphicon-chevron-up').addClass('glyphicon glyphicon-chevron-down');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon glyphicon-chevron-down').addClass('glyphicon glyphicon-chevron-up');
        }
    })

 
      //For dynamic fields
//      {
//       $(function () {
  
//           var addFormGroup = function (event) {
//               event.preventDefault();
  
//               var $formGroup = $(this).closest('.form-group');
//               var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
//               var $formGroupClone = $formGroup.clone();
  
//               $(this)
//                   .toggleClass('btn-default btn-add btn-danger btn-remove')
//                   .html('–');
  
//               $formGroupClone.find('input').val('');
//               $formGroupClone.insertAfter($formGroup);
  
//               var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
//               if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
//                   $lastFormGroupLast.find('.btn-add').attr('disabled', true);
//               }
//           };
  
//           var removeFormGroup = function (event) {
//               event.preventDefault();
  
//               var $formGroup = $(this).closest('.form-group');
//               var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
  
//               var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
//               if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
//                   $lastFormGroupLast.find('.btn-add').attr('disabled', false);
//               }
  
//               $formGroup.remove();
//           };
  
//           var countFormGroup = function ($form) {
//               return $form.find('.form-group').length;
//           };
  
//           $(document).on('click', '.btn-add', addFormGroup);
//           $(document).on('click', '.btn-remove', removeFormGroup);
  
//       });
//   }

  }
  

}
