import devson
from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class LoginForm(AuthenticationForm):
    username = forms.RegexField(regex=r'^\w+$', widget=forms.TextInput(
                                attrs={'placeholder': 'Ingrese su usuario','required':''}))
    password = forms.CharField(widget=forms.PasswordInput(
                               attrs={'placeholder': 'Ingrese su clave','required':''}))

    def __init__(self, * args, ** kwargs):
        super(LoginForm, self).__init__(*args, ** kwargs)
        if self.errors:
            for f_name in self.fields:
                classes = self.fields[f_name].widget.attrs.get('class', '')
                classes += ' has-error'
                self.fields[f_name].widget.attrs['class'] = classes



class RegistrationForm(forms.Form):

    username = forms.RegexField(regex=r'^\w+$', widget=forms.TextInput(
        attrs={'placeholder': "Ingrese su usuario", 'required':''}))
    email = forms.EmailField(widget=forms.EmailInput(
        attrs={'class':'email','placeholder': "Ingrese su e-mail", 'required':''}))
    password1 = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': "Ingrese su clave", 'required':''}))
    password2 = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': "Confirme su clave", 'required':''}))
    first_name = forms.CharField(widget=forms.TextInput(
        attrs={'placeholder': "Ingrese su nombre completo", 'required':''}))
    last_name = forms.CharField(widget=forms.TextInput(
        attrs={'placeholder': "Ingrese su trabajo", 'required':''}))    

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        if self.errors:
            for f_name in self.fields:
                if f_name in self.errors:
                    classes = self.fields[f_name].widget.attrs.get('class', '')
                    classes += ' has-error'
                    self.fields[f_name].widget.attrs['class'] = classes

    def clean_username(self):
        try:
            user = User.objects.get(
                username__iexact=self.cleaned_data['username'])
        except User.DoesNotExist:
            return self.cleaned_data['username']
        raise forms.ValidationError("El usuario ya existe")

    def clean(self):
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError("Claves no coinciden")
        return self.cleaned_data
